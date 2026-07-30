import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function POST(request, { params }) {
  const { data: student } = await supabase.from('users').select('id').eq('id', params.id).eq('role', 'student').maybeSingle();
  if (!student) return new Response('Student not found', { status: 404 });

  const formData = await request.formData();

  for (const [key, value] of formData.entries()) {
    if (key.startsWith('grade_')) {
      const enrollId = parseInt(key.replace('grade_', ''), 10);
      await supabase.from('enrollments').update({ grade: value }).eq('id', enrollId).eq('student_id', student.id);
    }
  }

  return NextResponse.redirect(new URL('/transcript/' + params.id, request.url));
}

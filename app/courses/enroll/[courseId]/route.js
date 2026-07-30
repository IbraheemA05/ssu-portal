import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';
import { getCurrentUser } from '../../../../lib/getUser';

export async function GET(request, { params }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.redirect(new URL('/login', request.url));

  const { data: course } = await supabase.from('courses').select('id').eq('id', params.courseId).maybeSingle();
  if (!course) return new Response('Course not found', { status: 404 });

  const { data: existing } = await supabase
    .from('enrollments')
    .select('id')
    .eq('student_id', user.id)
    .eq('course_id', course.id)
    .maybeSingle();

  if (!existing) {
    await supabase.from('enrollments').insert({ student_id: user.id, course_id: course.id, grade: '—' });
  }

  return NextResponse.redirect(new URL('/dashboard', request.url));
}

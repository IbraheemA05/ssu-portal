import { NextResponse } from 'next/server';
import { supabase } from '../../../../../lib/supabase';

export async function POST(request, { params }) {
  const { data: enrollment } = await supabase.from('enrollments').select('id').eq('id', params.enrollId).single();
  if (!enrollment) return new Response('Enrollment not found', { status: 404 });

  const formData = await request.formData();
  const grade = formData.get('grade');

  await supabase.from('enrollments').update({ grade }).eq('id', params.enrollId);

  return NextResponse.redirect(new URL('/lecturer/grades', request.url));
}

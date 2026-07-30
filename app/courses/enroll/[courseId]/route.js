import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';
import { getCurrentUser } from '../../../../lib/getUser';

export async function GET(request, { params }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.redirect(new URL('/login', request.url));

  const { data: course } = await supabase.from('courses').select('id').eq('id', params.courseId).single();
  if (!course) return new Response('Course not found', { status: 404 });

  const { data: existing } = await supabase
    .from('enrollments')
    .select('id')
    .eq('student_id', user.id)
    .eq('course_id', course.id)
    .single();

  if (!existing) {
    const { data: maxEnr } = await supabase.from('enrollments').select('id').order('id', { ascending: false }).limit(1).single();
    await supabase.from('enrollments').insert({ id: (maxEnr?.id || 0) + 1, student_id: user.id, course_id: course.id, grade: '—' });
  }

  return NextResponse.redirect(new URL('/dashboard', request.url));
}

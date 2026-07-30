import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function POST(request) {
  const formData = await request.formData();
  const code = formData.get('code');
  const title = formData.get('title');
  const instructor = formData.get('instructor') || 'TBD';
  const instructorId = formData.get('instructorId') ? parseInt(formData.get('instructorId'), 10) : null;
  const credits = parseInt(formData.get('credits'), 10) || 3;
  const schedule = formData.get('schedule') || 'TBD';
  const capacity = parseInt(formData.get('capacity'), 10) || 30;

  if (!code || !title) {
    return new Response('Course code and title are required', { status: 400 });
  }

  await supabase.from('courses').insert({
    code, title, instructor, instructor_id: instructorId, credits, schedule, capacity,
  });

  return NextResponse.redirect(new URL('/admin', request.url));
}

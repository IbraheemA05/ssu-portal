import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { getCurrentUser } from '../../../lib/getUser';
import { findChallenge, validateFlag } from '../../../lib/challenges';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { challengeId, flag } = await request.json();

  if (!challengeId || !flag) {
    return NextResponse.json({ error: 'Missing challengeId or flag' }, { status: 400 });
  }

  const challenge = findChallenge(challengeId);
  if (!challenge) {
    return NextResponse.json({ error: 'Unknown challenge' }, { status: 404 });
  }

  if (!validateFlag(challengeId, flag)) {
    return NextResponse.json({ error: 'Incorrect flag', correct: false }, { status: 200 });
  }

  const { error: insertError } = await supabase
    .from('user_flags')
    .insert({ user_id: user.id, challenge_id: challengeId });

  if (insertError) {
    if (insertError.code === '23505') {
      return NextResponse.json({ error: 'Already completed', correct: true });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }

  return NextResponse.json({ correct: true, message: 'Challenge completed!' });
}

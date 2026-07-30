import { NextResponse } from 'next/server';
import { getChallenges } from '../../../lib/challenges';
import { supabase } from '../../../lib/supabase';
import { getCurrentUser } from '../../../lib/getUser';

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getCurrentUser();

  let completed = [];
  if (user) {
    const { data: flags } = await supabase
      .from('user_flags')
      .select('challenge_id')
      .eq('user_id', user.id);
    completed = (flags || []).map(f => f.challenge_id);
  }

  const challenges = getChallenges().map(c => ({
    ...c,
    completed: completed.includes(c.id),
  }));

  return NextResponse.json(challenges);
}

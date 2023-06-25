import { NextResponse } from 'next/server';
import fetch from 'cross-fetch';

export async function GET(
  _: Request,
  { params }: { params: { hash: string } }
) {
  const data = await fetch(
    `https://eth-script-indexer-eca25c4cf43b.herokuapp.com/api/ethscriptions/exists/${params.hash}`
  );

  const json = await data.json();

  return NextResponse.json({ ...json });
}

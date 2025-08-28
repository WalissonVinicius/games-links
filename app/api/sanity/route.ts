import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'fcw2lrv2';
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
    
    const query = `*[_type == "gameLink"] | order(title asc) {
      _id,
      title,
      url,
      _createdAt
    }`;
    
    const encodedQuery = encodeURIComponent(query);
    const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${encodedQuery}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Sanity API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return NextResponse.json(data.result || []);
  } catch (error) {
    console.error('Error fetching from Sanity:', error);
    return NextResponse.json(
      { error: 'Erro ao carregar dados do Sanity' },
      { status: 500 }
    );
  }
}

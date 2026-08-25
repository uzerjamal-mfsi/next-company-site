import { NextRequest, NextResponse } from 'next/server';

// Dummy endpoint as mentioned in the assignment description
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    console.log('Contact form API:', {
      name,
      email,
      message,
    });

    return NextResponse.json({
      success: true,
      message: 'Thanks for reaching out! We will get back to you soon.',
    });
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body' }, { status: 400 });
  }
}

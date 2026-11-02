import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } = body;

    if (!apiKey || !projectId) {
      return NextResponse.json({ success: false, error: 'apiKey and projectId are required.' }, { status: 400 });
    }

    const envPath = path.resolve(process.cwd(), '.env.local');
    let envContent = '';
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }

    // Helper to update or append env var
    const updateEnvVar = (key: string, value: string) => {
      const regex = new RegExp(`^${key}=.*$`, 'm');
      if (regex.test(envContent)) {
        envContent = envContent.replace(regex, `${key}=${value}`);
      } else {
        envContent += `\n${key}=${value}`;
      }
    };

    updateEnvVar('NEXT_PUBLIC_FIREBASE_API_KEY', apiKey);
    updateEnvVar('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', authDomain || `${projectId}.firebaseapp.com`);
    updateEnvVar('NEXT_PUBLIC_FIREBASE_PROJECT_ID', projectId);
    updateEnvVar('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET', storageBucket || `${projectId}.appspot.com`);
    updateEnvVar('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', messagingSenderId || '');
    updateEnvVar('NEXT_PUBLIC_FIREBASE_APP_ID', appId || '');

    fs.writeFileSync(envPath, envContent.trim() + '\n', 'utf8');

    return NextResponse.json({
      success: true,
      message: 'Firebase configuration saved successfully to .env.local and activated!'
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { baseDetails, departments } = body;

        // Make sure we have credentials
        if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
            console.error("Missing Google Sheets credentials in .env");
            return NextResponse.json({ success: false, error: 'Server misconfiguration' }, { status: 500 });
        }

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });
        const spreadsheetId = process.env.GOOGLE_SHEET_ID;

        // Common values from Step 1
        const commonRow = [
            new Date().toISOString(),
            baseDetails.fullName || '',
            baseDetails.regNo || '',
            baseDetails.vitEmail || '',
            baseDetails.phoneNo || '',
            baseDetails.yearOfStudy || ''
        ];

        // Map internal department IDs to actual Google Sheet tab names based on your screenshot
        const SHEET_TAB_NAMES: Record<string, string> = {
            'technical': 'technical',
            'webdev': 'web-dev',
            'design': 'design',
            'management': 'management',
            'finance': 'finance',
            'content': 'social-media' // Mapped from screenshot
        };

        // For each department submitted, we append a row to that specific sheet tab
        const promises = Object.keys(departments).map(async (dept) => {
            const answers = departments[dept];
            
            // Check if all fields are empty for this department
            const hasAnswers = Object.values(answers).some(val => val && String(val).trim() !== '');
            if (!hasAnswers) return null; // Do not write empty forms

            // Extract answers sorted by question ID (e.g., q1, q2, q3) to ensure columns align
            const sortedKeys = Object.keys(answers).sort((a, b) => {
                const numA = parseInt(a.replace('q', '')) || 0;
                const numB = parseInt(b.replace('q', '')) || 0;
                return numA - numB;
            });
            const answerVals = sortedKeys.map(key => answers[key]);

            const row = [...commonRow, ...answerVals];
            const tabName = SHEET_TAB_NAMES[dept] || dept;

            return sheets.spreadsheets.values.append({
                spreadsheetId,
                range: `${tabName}!A:Z`,
                valueInputOption: 'USER_ENTERED',
                requestBody: {
                    values: [row]
                }
            });
        });

        await Promise.all(promises);

        return NextResponse.json({ success: true, message: 'Application submitted successfully' });

    } catch (error: any) {
        console.error('Submission Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

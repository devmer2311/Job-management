import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { JobFilters } from '@/types/job';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const location = searchParams.get('location') || '';
    const job_type = searchParams.get('job_type') || '';
    const salary_min = searchParams.get('salary_min') || '';
    const salary_max = searchParams.get('salary_max') || '';

    let queryText = `
      SELECT * FROM jobs 
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramIndex = 1;

    if (search) {
      queryText += ` AND (job_title ILIKE $${paramIndex} OR company_name ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    if (location) {
      queryText += ` AND location ILIKE $${paramIndex}`;
      params.push(`%${location}%`);
      paramIndex++;
    }

    if (job_type) {
      queryText += ` AND job_type = $${paramIndex}`;
      params.push(job_type);
      paramIndex++;
    }

    queryText += ` ORDER BY created_at DESC`;

    const result = await query(queryText, params);
    
    return NextResponse.json(result.rows);
  } catch (error: any) {
    console.error('Error fetching jobs:', error);
    
    // Return more specific error messages
    if (error.code === 'ECONNRESET') {
      return NextResponse.json({ 
        error: 'Database connection was reset. Please check your database connection.' 
      }, { status: 503 });
    }
    
    if (error.code === 'ENOTFOUND') {
      return NextResponse.json({ 
        error: 'Database server not found. Please check your DATABASE_URL.' 
      }, { status: 503 });
    }
    
    return NextResponse.json({ 
      error: 'Failed to fetch jobs',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      job_title,
      company_name,
      location,
      job_type,
      salary_range,
      job_description,
      requirements,
      responsibilities,
      application_deadline
    } = body;

    const result = await query(
      `INSERT INTO jobs (
        job_title, company_name, location, job_type, salary_range,
        job_description, requirements, responsibilities, application_deadline
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        job_title,
        company_name,
        location,
        job_type,
        salary_range,
        job_description,
        requirements,
        responsibilities,
        application_deadline
      ]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: any) {
    console.error('Error creating job:', error);
    
    // Return more specific error messages
    if (error.code === 'ECONNRESET') {
      return NextResponse.json({ 
        error: 'Database connection was reset. Please check your database connection.' 
      }, { status: 503 });
    }
    
    if (error.code === 'ENOTFOUND') {
      return NextResponse.json({ 
        error: 'Database server not found. Please check your DATABASE_URL.' 
      }, { status: 503 });
    }
    
    return NextResponse.json({ 
      error: 'Failed to create job',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}
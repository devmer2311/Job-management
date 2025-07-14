import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const result = await query('SELECT * FROM jobs WHERE id = $1', [params.id]);
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error: any) {
    console.error('Error fetching job:', error);
    
    if (error.code === 'ECONNRESET') {
      return NextResponse.json({ 
        error: 'Database connection was reset. Please check your database connection.' 
      }, { status: 503 });
    }
    
    return NextResponse.json({ 
      error: 'Failed to fetch job',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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
      `UPDATE jobs SET 
        job_title = $1, company_name = $2, location = $3, job_type = $4,
        salary_range = $5, job_description = $6, requirements = $7,
        responsibilities = $8, application_deadline = $9, updated_at = CURRENT_TIMESTAMP
      WHERE id = $10 RETURNING *`,
      [
        job_title,
        company_name,
        location,
        job_type,
        salary_range,
        job_description,
        requirements,
        responsibilities,
        application_deadline,
        params.id
      ]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error: any) {
    console.error('Error updating job:', error);
    
    if (error.code === 'ECONNRESET') {
      return NextResponse.json({ 
        error: 'Database connection was reset. Please check your database connection.' 
      }, { status: 503 });
    }
    
    return NextResponse.json({ 
      error: 'Failed to update job',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const result = await query('DELETE FROM jobs WHERE id = $1 RETURNING *', [params.id]);
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Job deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting job:', error);
    
    if (error.code === 'ECONNRESET') {
      return NextResponse.json({ 
        error: 'Database connection was reset. Please check your database connection.' 
      }, { status: 503 });
    }
    
    return NextResponse.json({ 
      error: 'Failed to delete job',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}
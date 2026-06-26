'use client';

import { useEffect, useState, useCallback } from 'react';
import { submissionsApi } from '@/lib/api/submissions';
import { Submission, SubmissionStatus } from '@/types';
import { toast } from 'sonner';


import { SubmissionsTabs } from './components/SubmissionsTabs';
import { SubmissionsTable } from './components/SubmissionsTable';

export default function SubmissionsPage() {
    const [activeTab, setActiveTab] = useState<SubmissionStatus>('PENDING');
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchSubmissions = useCallback(async (status: SubmissionStatus) => {
        setLoading(true);
        try {
            const res = await submissionsApi.getAll({ status, limit: 50 });
            setSubmissions(res.submissions);
            setTotal(res.total);
        } catch {
            toast.error('Failed to load submissions');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSubmissions(activeTab);
    }, [activeTab, fetchSubmissions]);

    const handleTabChange = (status: SubmissionStatus) => {
        setActiveTab(status);
        setSubmissions([]); 
    };

    return (
        <div className="space-y-5">
            <SubmissionsTabs 
                activeTab={activeTab} 
                total={total} 
                onTabChange={handleTabChange} 
            />
            
            <SubmissionsTable 
                submissions={submissions} 
                loading={loading} 
                activeTab={activeTab} 
            />
        </div>
    );
}
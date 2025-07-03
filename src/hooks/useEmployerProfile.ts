'use client';

import { useState, useEffect } from 'react';
import { ResponseDetail } from '@/types/respones/detail';
import { apiMeEmployerProfile } from '@/api/auth';

export function useEmployerProfile() {
  const [data, setData] = useState<ResponseDetail.EmployerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiMeEmployerProfile();
        setData(response.data);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Không thể tải thông tin profile';
        setError(errorMessage);
        console.error('Error fetching employer profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiMeEmployerProfile();
      setData(response.data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Không thể tải thông tin profile';
      setError(errorMessage);
      console.error('Error refetching employer profile:', err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
} 
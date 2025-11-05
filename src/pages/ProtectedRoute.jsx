import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function ProtectedRoute({ children, requireUid }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      const { data: sessionData, error } = await supabase.auth.getSession();
      const user = sessionData?.session?.user;

      if (user && user.id === requireUid) {
        if (mounted) setAllowed(true);
      } else {
        if (mounted) setAllowed(false);
      }
      if (mounted) setLoading(false);
    };

    check();
    // Oturum değişimlerini dinle
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      const user = session?.user;
      if (user && user.id === requireUid) setAllowed(true);
      else setAllowed(false);
      setLoading(false);
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, [requireUid]);

  if (loading) return <div>Yükleniyor...</div>;
  if (!allowed) return <Navigate to="/admin-login" replace />;
  return children;
}

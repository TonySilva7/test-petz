import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BreadCrumbWrapper } from './styles';

function Breadcrumbs() {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<
    { path: string; label: string }[]
  >([]);

  useEffect(() => {
    const updateBreadcrumbs = () => {
      const segments = router.asPath
        .split('/')
        .filter((segment) => segment !== '');

      const breadcrumbItems =
        segments.length === 0
          ? []
          : [
              { path: '/', label: 'Home' },
              ...segments.map((segment, index) => {
                const breadcrumbPath = `/${segments
                  .slice(0, index + 1)
                  .join('/')}`;
                return { path: breadcrumbPath, label: segment };
              }),
            ];

      setBreadcrumbs(breadcrumbItems);
    };

    updateBreadcrumbs();

    router.events.on('routeChangeComplete', updateBreadcrumbs);

    return () => {
      router.events.off('routeChangeComplete', updateBreadcrumbs);
    };
  }, [router]);

  return (
    <BreadCrumbWrapper aria-label="breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={breadcrumb.path}>
          <a
            href={breadcrumb.path}
            onClick={(e) => {
              e.preventDefault();
              router.push(breadcrumb.path);
            }}
            style={{ color: 'white', cursor: 'pointer' }}
          >
            {breadcrumb.label}
          </a>
          {index < breadcrumbs.length - 1 && <>&raquo;</>}
        </span>
      ))}
    </BreadCrumbWrapper>
  );
}

export { Breadcrumbs };

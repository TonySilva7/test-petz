import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function Breadcrumbs() {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<
    { path: string; label: string }[]
  >([]);

  useEffect(() => {
    // Função para atualizar os breadcrumbs com base na rota atual
    const updateBreadcrumbs = () => {
      const segments = router.asPath
        .split('/')
        .filter((segment) => segment !== '');

      // Se o usuário estiver em uma página que não seja a página inicial ("/"), adicione "Home" no início dos breadcrumbs
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

    // Execute a função ao carregar a página
    updateBreadcrumbs();

    // Registre um ouvinte para atualizar os breadcrumbs quando a rota mudar
    router.events.on('routeChangeComplete', updateBreadcrumbs);

    // Limpe o ouvinte quando o componente for desmontado
    return () => {
      router.events.off('routeChangeComplete', updateBreadcrumbs);
    };
  }, [router]);

  return (
    <nav aria-label="breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={breadcrumb.path}>
          <a
            href={breadcrumb.path}
            onClick={(e) => {
              e.preventDefault();
              // Ao clicar em um breadcrumb, navegue para a rota correspondente
              router.push(breadcrumb.path);
            }}
            style={{ color: 'white', cursor: 'pointer' }}
          >
            {breadcrumb.label}
          </a>
          {index < breadcrumbs.length - 1 && <>&nbsp;&gt;&nbsp;</>}
        </span>
      ))}
    </nav>
  );
}

export { Breadcrumbs };

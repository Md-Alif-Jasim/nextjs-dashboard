import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';

// Correctly type PageProps to match Next.js expectations
interface PageProps {
  params: {
    id: string; // The dynamic route parameter
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = params;

  try {
    // Fetch invoice and customer data concurrently
    const [invoice, customers] = await Promise.all([
      fetchInvoiceById(id),
      fetchCustomers(),
    ]);

    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Invoices', href: '/dashboard/invoices' },
            {
              label: 'Edit Invoice',
              href: `/dashboard/invoices/${id}/edit`,
              active: true,
            },
          ]}
        />
        <Form invoice={invoice} customers={customers} />
      </main>
    );
  } catch (error) {
    console.error('Error loading invoice data:', error);
    return (
      <main>
        <p>Failed to load invoice data. Please try again later.</p>
      </main>
    );
  }
}

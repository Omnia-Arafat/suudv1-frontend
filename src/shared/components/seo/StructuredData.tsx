'use client';

import Script from 'next/script';
import { structuredData } from '@/shared/config/metadata';

interface StructuredDataProps {
  data?: any;
  type?: 'organization' | 'website' | 'jobPosting';
}

export function StructuredData({ data, type = 'website' }: StructuredDataProps) {
  const jsonLd = data || structuredData[type];

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Component for job posting structured data
export function JobPostingStructuredData({ job }: { job: any }) {
  const jobStructuredData = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "datePosted": job.created_at,
    "validThrough": job.deadline,
    "employmentType": job.type,
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.company?.name,
      "url": job.company?.website,
      "logo": job.company?.logo
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location,
        "addressCountry": "SA"
      }
    },
    "baseSalary": job.salary ? {
      "@type": "MonetaryAmount",
      "currency": "SAR",
      "value": {
        "@type": "QuantitativeValue",
        "minValue": job.salary.min,
        "maxValue": job.salary.max,
        "unitText": "MONTH"
      }
    } : undefined,
    "url": `${process.env.NEXT_PUBLIC_APP_URL}/jobs/${job.id}`,
    "workHours": "40 hours per week"
  };

  return <StructuredData data={jobStructuredData} type="jobPosting" />;
}


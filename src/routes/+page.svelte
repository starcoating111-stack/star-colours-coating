<script lang="ts">
  import { siteConfig } from '$lib/config/site.config';
  import Hero from '$lib/components/sections/Hero.svelte';
  import AboutPreview from '$lib/components/sections/AboutPreview.svelte';
  import Services from '$lib/components/sections/Services.svelte';
  import FeaturedProjects from '$lib/components/sections/FeaturedProjects.svelte';
  import Testimonials from '$lib/components/sections/Testimonials.svelte';
  import FaqPreview from '$lib/components/sections/FaqPreview.svelte';
  import ContactCta from '$lib/components/sections/ContactCta.svelte';
  import TeamPreview from '$lib/components/sections/TeamPreview.svelte';

  let { data } = $props<{
    data: {
      settings: any;
      services: any[];
      projects: any[];
      testimonials: any[];
      faqs: any[];
      teamMembers: any[];
    };
  }>();
</script>

<svelte:head>
  <title>{data.settings?.companyName ?? siteConfig.seo.siteName} | {data.settings?.tagline ?? siteConfig.seo.tagline}</title>
  <meta name="description" content={siteConfig.seo.description} />
  
  <!-- Open Graph -->
  <meta property="og:title" content="{data.settings?.companyName ?? siteConfig.seo.siteName} - {data.settings?.tagline ?? siteConfig.seo.tagline}" />
  <meta property="og:description" content={siteConfig.seo.description} />
  <meta property="og:type" content="website" />
  <meta property="og:image" content={siteConfig.seo.ogImage} />
  
  <!-- Structured Data (JSON-LD LocalBusiness) -->
  {@html `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "${data.settings?.companyName || 'Client Site'}",
      "description": "${siteConfig.seo.description}",
      "telephone": "${data.settings?.phone || ''}",
      "email": "${data.settings?.email || ''}",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "${data.settings?.address || ''}"
      },
      "openingHours": "${data.settings?.workingHours || ''}"
    }
  </script>`}
</svelte:head>

<div>
  <!-- Dynamic homepage modules rendering loop -->
  {#each siteConfig.homepageModules as module}
    {#if module === 'hero'}
      <Hero settings={data.settings} />
    {:else}
      {#if module === 'aboutPreview'}
        <AboutPreview settings={data.settings} />
      {:else}
        {#if module === 'services'}
          <Services services={data.services} />
        {:else}
          {#if module === 'featuredProjects'}
            <FeaturedProjects projects={data.projects} />
          {:else}
            {#if module === 'testimonials'}
              <Testimonials testimonials={data.testimonials} />
            {:else}
              {#if module === 'faqPreview'}
                <FaqPreview faqs={data.faqs} />
              {:else}
                {#if module === 'contactCta'}
                  <ContactCta settings={data.settings} />
                {:else}
                  {#if module === 'teamPreview'}
                    <TeamPreview teamMembers={data.teamMembers} />
                  {/if}
                {/if}
              {/if}
            {/if}
          {/if}
        {/if}
      {/if}
    {/if}
  {/each}
</div>

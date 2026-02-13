// app/page.js
import Container from '@/components/Container';
import HomeBanner from '@/components/HomeBanner';
import HomeCategories from '@/components/HomeCategories';
import ProductGrid from '@/components/ProductGrid';
import ShopByBrand from '@/components/ShopByBrand';
import LatestBlog from '@/components/LatestBlog';

const Page = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, { cache: 'no-store' });
  const categories = await res.json();

  return (
    <Container>
      <HomeBanner />
      <div className="py-10">
        <ProductGrid />
      </div>
      <HomeCategories categories={categories} />
      <ShopByBrand />
      <LatestBlog /> {/* Server Component */}
    </Container>
  );
};

export default Page;


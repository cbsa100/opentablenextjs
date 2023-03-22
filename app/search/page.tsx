import Header from './components/Header';
import RestaurantCard from './components/RestaurantCard';
import SearchSideBar from './components/SearchSideBar';
import { PRICE, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
interface SearchParams {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}
const select = {
  id: true,
  name: true,
  main_image: true,
  price: true,
  Cuisine: true,
  location: true,
  slug: true,
  reviews: true,
};
const fetchRestaurantsByParams = (searchParams: SearchParams) => {
  const where: any = {};

  if (searchParams.city) {
    const location = {
      name: {
        equals: searchParams.city.toLowerCase(),
      },
    };
    where.location = location;
  }
  if (searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase(),
      },
    };
    where.Cuisine = cuisine;
  }
  if (searchParams.price) {
    const price = {
      equals: searchParams.price,
    };
    where.price = price;
  }

  return prisma.restaurant.findMany({
    where,
    select,
  });
};

const fetchLocations = () => {
  return prisma.location.findMany();
};
const fetchCuisines = () => {
  return prisma.cuisine.findMany();
};

export default async function search({ searchParams }: { searchParams: SearchParams }) {
  const restaurants = await fetchRestaurantsByParams(searchParams);
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();
  return (
    <>
      <Header />
      <div className='flex py-4 m-auto w-2/3 justify-between items-start'>
        <SearchSideBar locations={locations} cuisines={cuisines} searchParams={searchParams} />
        <div className='w-5/6'>
          {restaurants.length ? (
            restaurants.map(restaurant => <RestaurantCard restaurant={restaurant} />)
          ) : (
            <p>There are no restaurants in this location</p>
          )}
        </div>
      </div>
    </>
  );
}

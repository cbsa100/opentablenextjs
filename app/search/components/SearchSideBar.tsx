import { Cuisine, Location, PRICE } from '@prisma/client';
import Link from 'next/link';

const SearchSideBar = ({
  locations,
  cuisines,
  searchParams,
}: {
  locations: Location[];
  cuisines: Cuisine[];
  searchParams: { city?: string; cuisine?: string; price?: PRICE };
}) => {
  return (
    <div className='w-1/5'>
      <div className='border-b pb-4 flex flex-col'>
        <h1 className='mb-2'>Region</h1>
        {locations.map(location => (
          <Link
            href={{ pathname: '/search', query: { ...searchParams, city: location.name } }}
            className='fint-light text-reg capitalize'
          >
            {location.name}
          </Link>
        ))}
      </div>
      <div className='border-b pb-4 mt-3 flex flex-col'>
        <h1 className='mb-2'>Cuisine</h1>
        {cuisines.map(cuisine => (
          <Link
            href={{ pathname: '/search', query: { ...searchParams, cuisine: cuisine.name } }}
            className='fint-light text-reg capitalize'
          >
            {cuisine.name}
          </Link>
        ))}
      </div>
      <div className='mt-3 pb-4'>
        <h1 className='mb-2'>Price</h1>
        <div className='flex'>
          <Link
            href={{ pathname: '/search', query: { ...searchParams, price: PRICE.CHEAP } }}
            className='border w-full text-reg text-center font-light rounded-l p-2'
          >
            $
          </Link>
          <Link
            href={{ pathname: '/search', query: { ...searchParams, price: PRICE.REGULAR } }}
            className='border-r border-t border-b text-center w-full text-reg font-light p-2'
          >
            $$
          </Link>
          <Link
            href={{ pathname: '/search', query: { ...searchParams, price: PRICE.EXPENSIVE } }}
            className='border-r border-t border-b text-center w-full text-reg font-light p-2 rounded-r'
          >
            $$$
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchSideBar;

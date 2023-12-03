import { initialData } from "./seed";
import prisma from '../lib/prisma';
import { countries } from './seed-countries';

async function main(){
  //* 1. Erase all records
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();
  await prisma.userAddress.deleteMany();

  //* 2 Create tables with initData

  const {categories,products, users, countries} = initialData;
  //* Create Users
  await prisma.user.createMany({
    data: users,
  });

  //* Create categories
  // await prisma.category.create({
  //   data: {
  //     name:'Shirts',
  //   },
  // });
  const categoriesData = categories.map((name) => ({name}));
  await prisma.category.createMany({
    data: categoriesData,
  });

  //* Get created categories
  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string,string>) //! <string = shirt, categoryId>

  //* Create products
  products.forEach(async(product) => {
    const {type, images, ...rest} = product;
    const dbProduct = await prisma.product.create({
      data:{
        ...rest,
        categoryId: categoriesMap[type]
      },
    });

    // Images
    const imagesData = images.map((image) => ({
      url:image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  //* Countries
  await prisma.country.createMany({
    data: countries,
  });

  console.log('Seed executed');
}

(() => {
  if(process.env.NODE_ENV === 'production') return;
  main();
})();
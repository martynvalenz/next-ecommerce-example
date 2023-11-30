import { initialData } from "./seed";
import prisma from '../lib/prisma';

async function main(){
  //* 1. Erase all records
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  //* 2. Create categories
  // await prisma.category.create({
  //   data: {
  //     name:'Shirts',
  //   },
  // });
  const {categories,products} = initialData;
  const categoriesData = categories.map((name) => ({name}));
  await prisma.category.createMany({
    data: categoriesData,
  });

  //* 3. Get created categories
  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string,string>) //! <string = shirt, categoryId>

  //* 4. Create products
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

  console.log('Seed executed');
}

(() => {
  if(process.env.NODE_ENV === 'production') return;
  main();
})();
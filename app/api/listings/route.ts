import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request,
) {
  const currentUser = await getCurrentUser();


  if (!currentUser) {
    return NextResponse.error();
  }


  const body = await request.json();
  const {
    title,
    description,
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
    price
  } = body;

  const listing = await prisma.listing.create({
    data: {
      userId: currentUser.id,
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
    }
  });

  return NextResponse.json(listing);
}

'use client';

import CategoryBox from "../CategoryBox";
import Container from "../Container";
import { categories } from "@/app/constants/categories";
import { usePathname, useSearchParams } from 'next/navigation';

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const currentPath = usePathname();
    const isMainPage = currentPath === '/';
    if (!isMainPage) {
        return null;
    }
    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((item) => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        selected={category === item.label}
                    />
                ))}
            </div>
        </Container>
    );
}

export default Categories;
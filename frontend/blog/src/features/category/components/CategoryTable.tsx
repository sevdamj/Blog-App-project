import { cookies } from "next/headers";
import Empty from "@/ui/Empty";
import Table from "@/ui/Table";
// import { getCategoryApi } from "@/features/category/api/categoryServices";
import CetegoryRow from "./CetegoryRow";
import { Category } from "../types/category";
import http from "@/services/httpService";


async function CategoryTable() {
  let categories: Category[] = [];
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  try {
    const response = await http.get("/category/list", {
      headers: {
        Cookie: cookieHeader,
      },
    });
    categories = response.data.data.categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
  }


  //   try {
  //   const cookieStore = await cookies();
  //   const fetchedCategories = (await getCategoryApi({
  //     headers: {
  //       Cookie: cookieStore.toString(),
  //     },
  //   })) as Category[];
  //   categories = fetchedCategories || [];
  // } catch (error) {
  //   console.error("Error fetching categories:", error);
  // }


  if (!categories.length) return <Empty resourceName="دسته بندی ای" />;

  return (
    <Table>
      <Table.Header>
        <th className="p-4">#</th>
        <th>دسته بندی</th>
        <th>توضیحات</th>
        <th>تاریخ ایجاد</th>
        <th>عملیات</th>
      </Table.Header>

      <Table.Body>
        {categories.map((category, index) => (
          <CetegoryRow
            key={category._id}
            category={category}
            index={index + 1}
          />
        ))}
      </Table.Body>
    </Table>
  );
}

export default CategoryTable;

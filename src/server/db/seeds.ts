import postgres from "postgres";
import { universities } from "./schema";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import * as dotenv from "dotenv";

dotenv.config();

const UNIVERSITIES = [
  {
    id: "9ccf35b6-5b3b-4e94-a6c1-3f7122c6a6c1",
    name: "Ho Chi Minh City University of Technology",
    abbreviation: "HCMUT",
    address: "268 Ly Thuong Kiet, District 10, Ho Chi Minh City"
  },
  {
    id: "0c2c1a0f-7d66-4d1b-8b27-1f1c1546d1b7",
    name: "Vietnam National University, Ho Chi Minh City",
    abbreviation: "VNUHCM",
    address: "Quarter 6, Linh Trung Ward, Thu Duc District, Ho Chi Minh City"
  },
  {
    id: "f8ab4c9c-a9a6-4d5b-92f5-058a49e034b8",
    name: "University of Economics Ho Chi Minh City",
    abbreviation: "UEH",
    address: "59C Nguyen Dinh Chieu, Dakao Ward, District 1, Ho Chi Minh City"
  },
  {
    id: "d8c0f76c-3e8a-46e4-8c2f-c32e3b0fd4af",
    name: "Ho Chi Minh City University of Science",
    abbreviation: "HCMUS",
    address: "227 Nguyen Van Cu, District 5, Ho Chi Minh City"
  },
  {
    id: "4a3b4d3b-46f5-4a8e-9a67-9f4accb7a9b0",
    name: "Ho Chi Minh City University of Social Sciences and Humanities",
    abbreviation: "HCMUSSH",
    address: "10-12, Dinh Tien Hoang, District 1, Ho Chi Minh City"
  },
  {
    id: "d2aeb7e2-2198-4c8c-8fbd-06a11e1f9b51",
    name: "University of Science and Technology of Hanoi - Ho Chi Minh City Campus",
    abbreviation: "USTH",
    address: "18 Hoang Quoc Viet, District 7, Ho Chi Minh City"
  },
  {
    id: "a7d387b2-4e8f-4f95-8c05-6a7482d7a83f",
    name: "RMIT University Vietnam",
    abbreviation: "RMIT",
    address: "702 Nguyen Van Linh, Tan Phong Ward, District 7, Ho Chi Minh City"
  },
  {
    id: "c9a39e8c-3c47-4d4b-9ca0-8d4e6ed3d7f0",
    name: "Vietnam-German University",
    abbreviation: "VGU",
    address: "6 Nguyen Van Cu, District 9, Ho Chi Minh City"
  },
  {
    id: "e6d9d2b6-4c26-4c48-9e6d-0687b5d9b1a2",
    name: "Ho Chi Minh City University of Foreign Languages and Information Technology",
    abbreviation: "HUFLIT",
    address: "32 Duong Trinh Phuong, District 1, Ho Chi Minh City"
  },
  {
    id: "3b2e0e3b-9e84-4a8d-9c68-1f60e3e7bcfb",
    name: "Vietnam Maritime University - Ho Chi Minh City Campus",
    abbreviation: "VMU",
    address: "2 Nguyen Duy Trinh, Binh Trung Tay Ward, District 2, Ho Chi Minh City"
  },
  {
    id: "b4a0b287-57b0-4f96-9869-873d1f4d0c1f",
    name: "Ho Chi Minh City University of Education",
    abbreviation: "HCMUE",
    address: "280 An Duong Vuong, District 5, Ho Chi Minh City"
  },
  {
    id: "6eaa8f7e-7bb6-4a03-8a2d-bb8d2e9a2b5c",
    name: "University of Technology and Education, Ho Chi Minh City",
    abbreviation: "UTEHCMC",
    address: "1 Vo Van Ngan, Thu Duc District, HoChi Minh City"
  },
  {
    id: "3b65a0ec-4ff1-4b0d-8f3b-9ae3a0509364",
    name: "Ho Chi Minh City University of Architecture",
    abbreviation: "HCMUA",
    address: "196 Pasteur, District 3, Ho Chi Minh City"
  },
  {
    id: "9f0a8f0f-d2bf-4c28-8d88-4f6ad4ffa997",
    name: "Ho Chi Minh City University of Transport",
    abbreviation: "HCMUTRANS",
    address: "2 D3 Street, Binh Thanh District, Ho Chi Minh City"
  },
  {
    id: "aebef8d8-3a8a-4f9e-8c9a-9b9e2e0f1e5e",
    name: "Ton Duc Thang University",
    abbreviation: "TDTU",
    address: "19 Nguyen Huu Tho, Tan Phong Ward, District 7, Ho Chi Minh City"
  },
  {
    id: "7c6c4807-4cc0-4d3a-8d8f-3e4b1f815f7c",
    name: "Ho Chi Minh City University of Agriculture and Forestry",
    abbreviation: "HUAF",
    address: "13 Ngo Quyen, Ward 9, District 5, Ho Chi Minh City"
  },
  {
    id: "a0a9e7c5-ec1d-4e4e-bc85-7d88f0cefd5a",
    name: "Ho Chi Minh City University of Law",
    abbreviation: "HCMULAW",
    address: "2 Nguyen Tat Thanh, District 4, Ho Chi Minh City"
  },
  {
    id: "f8e4b8bc-0d77-4500-9d81-9b91e7bce1b9",
    name: "University of Finance - Marketing",
    abbreviation: "UFM",
    address: "331 Nguyen Trong Tuyen, Ward 2, Tan Binh District, Ho Chi Minh City"
  },
  {
    id: "3b66e2e4-6f02-4a0a-9b03-6f7f5f1e9b4e",
    name: "Ho Chi Minh City University of Industry",
    abbreviation: "HUOI",
    address: "12 Nguyen Van Bao, Ward 4, Go Vap District, Ho Chi Minh City"
  },
  {
    id: "1e9b6d3e-6e34-4d1d-b7e7-3c2b8f2a3d66",
    name: "Saigon University",
    abbreviation: "SGU",
    address: "273 An Duong Vuong, District 5, Ho Chi Minh City"
  },
  {
    id: "2e1d1e0c-6fd9-4a4b-af23-0c31f8e293b1",
    name: "Ho Chi Minh City University of Fine Arts",
    abbreviation: "HUFA",
    address: "5 Phan Dang Luu, Binh Thanh District, Ho Chi Minh City"
  }
];

const main = async () => {
  try {
    if (!("DATABASE_URL" in process.env))
	    throw new Error("DATABASE_URL not found on .env.development");

    const client = postgres(process.env.DATABASE_URL!);

    const db = drizzle(
      client,
      { schema }
    );


    await db.insert(universities).values(UNIVERSITIES.map(u => ({
      id: u.id,
      name: u.name,
      code: u.abbreviation,
      address: u.address
    })))
    console.log('done');
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
}

void main();
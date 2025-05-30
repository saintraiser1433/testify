import { ExamineeModel } from "../models";
import prisma from "../prisma/prisma";

export const fetchExaminees = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      first_name: true,
      last_name: true,
      middle_name: true,
      username: true,
      password: true
    },
    where: {
      role: "examinee",
    },
    orderBy: {
      createdAt : 'desc'
    }
  });
};

export const findExamineeByName = async (
  first_name: string,
  last_name: string,
) => {
  const examinees = await prisma.user.findMany({
    where: {
      role: "examinee",
    },
  });

  const inputFullName = (first_name + last_name)
    .replace(/\s+/g, '')
    .toLowerCase();

  return examinees.find(user => {
    const userFullName =
      ((user.first_name ?? '') + (user.last_name ?? ''))
        .replace(/\s+/g, '')
        .toLowerCase();

    return userFullName === inputFullName;
  });
};




export const getExamineeById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id }
  })
}

export const createBulkExaminee = async (data: ExamineeModel[]) => {
  return await prisma.user.createMany({
    data: data.map(examinee => ({
      ...examinee,
      role: 'examinee'
    }))
  })
}

export const createExaminee = async (data: any) => {
  return await prisma.user.create({ data });
};

export const updateExamineeById = async (id: string, data: any) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteExamineeById = async (id: string) => {
  return await prisma.user.delete({
    where: { id },
  });
};

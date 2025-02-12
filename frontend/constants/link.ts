export const BASE_BREADCRUMB = [
    {
        label: "Home",
        icon: "i-heroicons-home",
        to: "/admin/home",
    },
]

export const EXAMINEE_BREADCRUMBS: BreadCrumbsModel[] = [
    ...BASE_BREADCRUMB,
    {
        label: "Examinee",
        icon: "i-heroicons-square-3-stack-3d",
    },
];

export const DEANS_BREADCRUMBS: BreadCrumbsModel[] = [
    ...BASE_BREADCRUMB,
    {
        label: "Deans",
        icon: "i-heroicons-square-3-stack-3d",
    },
];


export const DEPARTMENT_BREADCRUMBS: BreadCrumbsModel[] = [
    ...BASE_BREADCRUMB,
    {
        label: "Department",
        icon: "i-heroicons-square-3-stack-3d",
    },
];

export const COURSE_BREADCRUMBS: BreadCrumbsModel[] = [
    ...BASE_BREADCRUMB,
    {
        label: "Course",
        icon: "i-heroicons-square-3-stack-3d",
    },
];

export const EXAM_BREADCRUMBS: BreadCrumbsModel[] = [
    ...BASE_BREADCRUMB,
    {
        label: "Exam",
        icon: "i-heroicons-square-3-stack-3d",
    },
];

export const EXAM_QUESTION_BREADCRUMBS: BreadCrumbsModel[] = [
    ...EXAM_BREADCRUMBS,
    {
        label: "Manage Questions",
        icon: "i-heroicons-square-3-stack-3d",
    },
]





export const RANKINGS_BREADCRUMBS: BreadCrumbsModel[] = [
    ...BASE_BREADCRUMB,
    {
        label: "Rankings",
        icon: "i-heroicons-square-3-stack-3d",
    },
];


export const RECORD_BREADCRUMBS: BreadCrumbsModel[] = [
    ...BASE_BREADCRUMB,
    {
        label: "Rankings",
        icon: "i-heroicons-square-3-stack-3d",
        to: "/admin/rankings",
    },
    {
        label: "Examinee Record",
        icon: "i-heroicons-square-3-stack-3d",
    },
]

export const CONSOLIDATE_BREADCRUMBS: BreadCrumbsModel[] = [
    ...RECORD_BREADCRUMBS,
    {
        label: "Consolidate",
        icon: "i-heroicons-square-3-stack-3d",
    },
]




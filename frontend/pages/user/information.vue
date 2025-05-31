<script setup lang="ts">
definePageMeta({
  requiredRole: "examinee",
  layout: "user",
  middleware: ["check-information"],
});

useSeoMeta({
  title: "Testify Information",
  description: "This is information page",
  ogTitle: "Testify Information",
  ogDescription: "This is information page",
});

const { $api, $datefns, $toast } = useNuxtApp();
const { info } = useAuthentication();
const { handleApiError } = useErrorHandler();
const inf = JSON.parse(info.value);
const isSubmit = ref(false);
//date
const dateNow = computed(() => $datefns.format(new Date(), "MMMM d, yyyy"));

//submit information
const followUp = repository<ApiResponse<FollowupModel>>($api);
const onSubmit = async (onResponse: Partial<FollowupModel>) => {
  try {
    if (inf) {
      const data = {
        ...onResponse,
        ...{ examinee_id: String(inf.id) },
      };
      const response = await followUp.addFollowup(data as FollowupModel);
      if (response.status === 201) {
        isSubmit.value = true;
      }
    } else {
      $toast.error("Cant find id");
    }
  } catch (err) {
    return handleApiError(err);
  }
};
</script>
<template>
  <div
    v-if="!isSubmit"
    class="lg:w-1/4 mx-auto pb-14 translate-y-0 py-0 lg:translate-y-1/4"
  >
    <UICard :body="{ padding: 'sm:px-4' }" :header="{ padding: 'sm:p-0 p-0' }">
      <template #header>
        <UserDashboardHeader>
          <h2 class="text-gray-100 font-bold uppercase">FOLLOW UP INFORMATION</h2>
          <!-- <svg-icon name="seticons/dashboard" width="48" height="48"></svg-icon> -->
        </UserDashboardHeader>
      </template>
      <h2
        class="text-sm border-b border-gray-300 dark:border-gray-700 pb-2 mb-4 font-semibold"
      >
        Date Examination: {{ dateNow }}
      </h2>
      <UserFormInformation @data-information="onSubmit" />
    </UICard>
  </div>
  <UserDashboardRedirecting
    v-else
    title="Prepare yourself, the exam begins shortly. "
    navigate-to="user-exam"
    :count-down="10"
  ></UserDashboardRedirecting>
</template>

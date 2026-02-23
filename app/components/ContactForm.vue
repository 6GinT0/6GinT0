<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const { t } = useI18n();

const schema = z.object({
  name: z
    .string({
      required_error: t("contact_form.name.validation_required")
    })
    .min(3, t("contact_form.name.validation_min")),
  email: z
    .string({
      required_error: t("contact_form.email.validation_required")
    })
    .email(t("contact_form.email.validation_email")),
  subject: z
    .string({
      required_error: t("contact_form.subject.validation_required")
    })
    .min(3, t("contact_form.subject.validation_min")),
  body: z
    .string({
      required_error: t("contact_form.message.validation_required")
    })
    .min(3, t("contact_form.message.validation_min"))
});

type Schema = z.output<typeof schema>;

const form = useTemplateRef("form");
const state = reactive<Partial<Schema>>({
  name: undefined,
  email: undefined,
  subject: undefined,
  body: undefined
});

const toast = useToast();
const loading = ref(false);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { name, email, subject, body } = event.data;

  try {
    loading.value = true;

    await $fetch("/api/send", {
      method: "post",
      body: {
        name,
        email,
        subject,
        body
      }
    });

    toast.add({
      title: t("contact_form.submit.success.title"),
      description: t("contact_form.submit.success.message"),
      color: "success"
    });

    state.name = undefined;
    state.email = undefined;
    state.subject = undefined;
    state.body = undefined;

    form.value?.clear();
  } catch (error: unknown) {
    toast.add({
      title: t("contact_form.submit.error.title"),
      description: t("contact_form.submit.error.message"),
      color: "error"
    });
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <UForm
    ref="form"
    :schema="schema"
    :state="state"
    class="grid grid-cols-1 gap-4"
    @submit="onSubmit"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <UFormField :label="t('contact_form.name.label')" name="name" class="w-full">
        <UInput v-model="state.name" class="w-full" />
      </UFormField>

      <UFormField :label="t('contact_form.email.label')" name="email">
        <UInput v-model="state.email" class="w-full" />
      </UFormField>
    </div>

    <UFormField :label="t('contact_form.subject.label')" name="subject">
      <UInput v-model="state.subject" class="w-full" />
    </UFormField>

    <UFormField :label="t('contact_form.message.label')" name="body">
      <UTextarea v-model="state.body" class="w-full" />
    </UFormField>

    <UButton type="submit" :loading="loading" class="cursor-pointer flex justify-center">
      {{ t("contact_form.submit.text") }}
    </UButton>
  </UForm>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { emailSchema } from "~/schemas/email";
import { toast } from "vue-sonner";

const { t } = useI18n();

const { handleSubmit, isFieldDirty, resetForm } = useForm({
  validationSchema: toTypedSchema(emailSchema)
});

const onSubmit = handleSubmit(async (values) => {
  await sendEmail(values);
  resetForm();
});

async function sendEmail(values: EmailBody) {
  await $fetch("/api/send", {
    method: "POST",
    body: values
  });

  toast.success(t("pages.index.contact.submit.success"));
}
</script>

<template>
  <section class="container mx-auto px-4 space-y-16 my-64" id="contact">
    <h2 class="font-fredoka leading-none text-4xl md:text-5xl lg:text-6xl font-black">
      {{ t("pages.index.contact.title") }}
    </h2>
    <form @submit="onSubmit" class="space-y-4">
      <div class="grid grid-cols-2 space-x-4">
        <div class="space-y-2">
          <FormField v-slot="{ componentField }" name="name" :validate-on-blur="!isFieldDirty">
            <FormItem>
              <FormLabel>{{ t("pages.index.contact.name.label") }}</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  :placeholder="t('pages.index.contact.name.placeholder')"
                  class="bg-white border-primary dark:border-current/5 shadow-none"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div class="space-y-2">
          <FormField v-slot="{ componentField }" name="email" :validate-on-blur="!isFieldDirty">
            <FormItem>
              <FormLabel>{{ t("pages.index.contact.email.label") }}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="johndoe@gmail.com"
                  class="bg-white border-primary dark:border-current/5 shadow-none"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
      </div>
      <div class="space-y-2">
        <FormField v-slot="{ componentField }" name="subject" :validate-on-blur="!isFieldDirty">
          <FormItem>
            <FormLabel>{{ t("pages.index.contact.subject.label") }}</FormLabel>
            <FormControl>
              <Input
                type="text"
                :placeholder="t('pages.index.contact.subject.placeholder')"
                class="bg-white border-primary dark:border-current/5 shadow-none"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <div class="space-y-2">
        <FormField v-slot="{ componentField }" name="body" :validate-on-blur="!isFieldDirty">
          <FormItem>
            <FormLabel>{{ t("pages.index.contact.message.label") }}</FormLabel>
            <FormControl>
              <Textarea
                type="text"
                :placeholder="t('pages.index.contact.message.placeholder')"
                class="bg-white border-primary dark:border-current/5 shadow-none h-[150px]"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <Button type="submit" class="page-actions">
        {{ t("pages.index.contact.submit.text") }}
      </Button>
    </form>
  </section>
</template>

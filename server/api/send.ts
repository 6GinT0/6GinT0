import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default defineEventHandler(async (event) => {
  const { name, email, subject, body } = await readBody(event);

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "ulisesaucedo.se04@gmail.com",
      subject: subject,
      html: `
      <div style="background-color: blue; padding: 20px; color: white;">
        <h2>${name}</h2> ha mandado el siguiente email (${email}):
        <p>${body}</p>
      </div>
      `
    });

    return data;
  } catch (error) {
    return { error };
  }
});

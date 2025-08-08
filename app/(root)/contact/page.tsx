import ContactForm from "./ContactForm";

export const metadata = {
  title: "문의하기 - 할인탐정",
  description: "할인탐정에 문의사항이 있으시면 언제든지 연락해주세요.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-2">
      <ContactForm />
    </div>
  );
}

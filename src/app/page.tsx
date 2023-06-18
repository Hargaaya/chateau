export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col mx-auto w-full max-w-2xl py-12 px-6">
      <section>
        <h1 className="text-4xl font-bold">Chateau</h1>
        <p className="text-xl font-light">A Chatbot named Chateau</p>
      </section>

      <section className="mt-4">
        <h2 className="text-2xl font-bold">What is Chateau?</h2>
        <p className="text-xl font-light">
          Chateau is a chatbot that uses the OpenAI API to generate responses to your messages. It is a fun way to interact with the GPT-3
          model.
        </p>
      </section>
    </main>
  );
}

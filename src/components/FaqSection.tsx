"use client";

import { motion } from "motion/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    value: "item-1",
    question:
      "Qual a diferença entre as baterias do sistema Híbrido e Off-Grid?",
    answer:
      "No Off-Grid, as baterias são a sua única fonte de energia à noite; por isso, o banco de baterias é maior para garantir 100% de autonomia. No Híbrido, elas funcionam como um 'seguro': entram em ação se a rede da Energisa cair ou para reduzir o consumo nos horários de pico (energia mais cara).",
  },
  {
    value: "item-2",
    question: "Quanto tempo dura a bateria de um sistema solar?",
    answer:
      "Trabalhamos com tecnologias de ponta. As baterias de Lítio, que são a tendência atual, podem durar de 10 a 15 anos, dependendo do uso e das condições climáticas. Elas são muito mais eficientes e duráveis do que as antigas baterias estacionárias.",
  },
  {
    value: "item-3",
    question: "O sistema solar precisa de manutenção?",
    answer:
      "Sim, mas é simples. A principal manutenção é a limpeza dos painéis, que deve ser feita periodicamente (especialmente em épocas de seca em Campo Grande) para garantir que a poeira não bloqueie o sol. Também recomendamos uma revisão elétrica anual feita por nossa equipe técnica.",
  },
  {
    value: "item-4",
    question:
      "Se eu tiver um sistema On-Grid, posso transformá-lo em Híbrido depois?",
    answer:
      "Sim! É possível fazer um 'upgrade' instalando um inversor híbrido e o banco de baterias. Se você já tem placas instaladas, a MS Brasil Energy pode avaliar seu sistema atual e projetar a expansão para o modelo híbrido.",
  },
  {
    value: "item-5",
    question: "O sistema funciona em dias de chuva ou nublados?",
    answer:
      "Sim. Embora a produção seja menor do que em um dia de céu limpo, os painéis solares continuam gerando energia através da radiação difusa. No caso dos sistemas Off-Grid e Híbridos, as baterias garantem que você não sinta nenhuma diferença no fornecimento.",
  },
  {
    value: "item-6",
    question: "Como é feito o processo junto à Energisa?",
    answer:
      "Pode ficar tranquilo! A MS Brasil Energy cuida de toda a parte burocrática: desde o projeto de engenharia, solicitação de acesso, até a vistoria final e troca do relógio pela concessionária.",
  },
];

const FaqSection = () => {
  return (
    <section className="relative my-14 py-10">
      <div className="container mx-auto px-7">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 flex max-w-[600px] flex-col items-center text-center"
        >
          <h2 className="font-clash-display text-4xl font-bold text-emerald-500 sm:text-4xl md:text-6xl">
            Perguntas Frequentes
          </h2>
          <p className="font-montserrat mt-4 text-xl text-neutral-800">
            Algumas perguntas básicas e frequentes sobre os serviços e nossos
            sistemas de energia solar.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger className="font-montserrat text-left text-lg font-medium text-neutral-900">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="font-montserrat text-base leading-relaxed text-neutral-800">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;

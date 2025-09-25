import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "How do I list an item for sale?",
    answer: "To list an item, go to the 'List Now' section in the marketplace, fill in the details of your item, set a price, and publish the listing. It will then be visible to potential buyers.",
  },
  {
    question: "How does the payment system work?",
    answer: "Our payment system uses a secure escrow service. When a buyer pays for an item, the funds are held by SquadGoo until the item is delivered and the buyer confirms receipt. This protects both buyers and sellers.",
  },
  {
    question: "What is Squad Courier service?",
    answer: "Squad Courier is our in-house delivery service. You can opt for Squad Courier to handle the pickup and delivery of your items, ensuring a seamless and reliable transaction.",
  },
  {
    question: "How do I resolve a dispute?",
    answer: "If you have an issue with an order, you can file a dispute through the 'Dispute Resolution' section. Both parties will be invited to a mediated chat to resolve the issue with the help of our support team.",
  },
  {
    question: "What fees does SquadGoo charge?",
    answer: "SquadGoo charges a small percentage fee on each transaction. The exact fee depends on the category of the item and is clearly displayed before you confirm a transaction.",
  },
];

const FAQ = () => {
  return (
    <div className="mt-8 shadow-md bg-white p-4 rounded-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqData.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="p-4 bg-white rounded-lg shadow font-semibold text-gray-800">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="p-4 bg-gray-50 rounded-b-lg">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;

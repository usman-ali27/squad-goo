import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "TechCorp Australia",
      image: "/placeholder.svg",
      rating: 5,
      quote: "SquadGoo helped me find my dream job at a leading tech company. The platform is intuitive and the job matching is incredibly accurate."
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      company: "Growth Solutions",
      image: "/placeholder.svg",
      rating: 5,
      quote: "As a recruiter, I've found SquadGoo to be the most effective platform for finding qualified candidates. Highly recommended!"
    },
    {
      name: "Emma Williams",
      role: "Data Analyst",
      company: "Analytics Pro",
      image: "/placeholder.svg",
      rating: 5,
      quote: "The career resources and networking opportunities on SquadGoo are exceptional. It's more than just a job board."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied professionals who found success through SquadGoo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-accent/20" />
              
              {/* Rating */}
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-muted-foreground mb-8 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <Avatar className="w-12 h-12 mr-4">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback className="bg-accent text-white">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
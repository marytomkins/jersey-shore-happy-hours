import { useState } from "react";

const Feedback = () => {
  const [formText, setFormText] = useState("");

  const handleChange = (e) => {
    let value = e?.target?.value || "";
    setFormText(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://formspree.io/f/xvgayopb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: formText,
        }),
      });

      if (response.ok) {
        alert("Thank you! Your feedback has been submitted.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting.");
    }
    setFormText("");
  };

  return (
    <div className="feedback-page p-6 md:w-1/2 w-4/5 mx-auto bg-white rounded-md mt-8">
      <div className="text-2xl font-semibold text-center">Contact Us</div>
      <div className="text-sm my-4 px-4 text-center">
        Use the form below to contact us directly. {<br />}
        If we made any mistakes or missed any bars/restaurants, please let us
        know.{<br />}{<br />}
        If you would like a direct response, please include your email.
      </div>
      <form className="space-y-4">
        <textarea
          type="text"
          name="formText"
          value={formText}
          onChange={(e) => handleChange(e)}
          placeholder="Message"
          className="w-full px-3 py-2 border rounded"
          rows={6}
        />
      </form>
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="bg-blue hover-bg-light-blue text-sm text-white px-8 py-2 rounded"
          onClick={(e) => {
            if (formText.length > 0) handleSubmit(e);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
export default Feedback;

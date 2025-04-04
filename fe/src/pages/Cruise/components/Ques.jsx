import { Link } from "react-router-dom";
import SectionHeader from "~/components/SectionHeader/SectionHeader";
import Button from "~/components/Button/Button";

function Ques() {
  return (
    <div>
      <SectionHeader title={<h4>Câu hỏi thường gặp</h4>} />
      <div className="flex gap-4 align-center">
        <label className="md">Bạn có thể xem Câu hỏi thường gặp:</label>
        <Link target="_blank" to="/cau-hoi-thuong-gap">
          <Button normal linkColor>
            <label className="md">Tại đây</label>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Ques;

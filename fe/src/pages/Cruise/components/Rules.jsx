/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import SectionHeader from "~/components/SectionHeader/SectionHeader";
import Button from "~/components/Button/Button";

function Rules({ id }) {
  return (
    <div className="" id={id}>
      <SectionHeader title={<h4>Quy định chung và lưu ý</h4>} />
      <div className="flex gap-4 align-center">
        <label className="md">Bạn có thể xem Quy định chung và lưu ý:</label>

        <Link target="_blank" to="/quy-dinh-chung-va-luu-y">
          <Button normal linkColor>
            <div className="label md">Tại đây</div>
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

export default Rules;

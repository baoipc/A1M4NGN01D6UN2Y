import React, { useState } from "react";
import { FileText, Info } from "lucide-react";

const formGroups = [
  {
    category: "Biểu mẫu trực tuyến cho quy trình chuyển Đảng chính thức",
    forms: [
      {
        name: "Giấy giới thiệu nhận xét 213",
        notes: [
          "Lưu ý 1: Đảng viên dự bị điền đầy đủ thông tin cá nhân.",
          "Lưu ý 2: Kiểm tra thông tin trước khi gửi lên Chi ủy.",
        ],
        sampleFile: "#",
        formLink: "#",
      },
      {
        name: "Giấy nhận xét của Đảng viên hướng dẫn cho Đảng viên dự bị",
        notes: [
          "Lưu ý 1: Ghi rõ quá trình phấn đấu của Đảng viên dự bị.",
          "Lưu ý 2: Không để trống phần đánh giá cuối.",
        ],
        sampleFile: "#",
        formLink: "#",
      },
      {
        name: "Bảng kiểm điểm của Đảng viên dự bị",
        notes: [
          "Lưu ý 1: Viết trung thực, đầy đủ và có trách nhiệm.",
          "Lưu ý 2: Đảng viên ký và ghi rõ họ tên cuối trang.",
        ],
        sampleFile: "#",
        formLink: "#",
      },
      {
        name: "Giấy xin ý kiến nhận xét 213",
        notes: [
          "Lưu ý 1: Gửi về địa phương theo đúng thời gian quy định.",
          "Lưu ý 2: Sau khi nhận xét, phải nộp lại cho Chi ủy.",
        ],
        sampleFile: "#",
        formLink: "#",
      },
    ],
  },
  {
    category: "Biểu mẫu trực tuyến cho nhận xét cuối năm",
    forms: [
      {
        name: "Giấy xin ý kiến nhận xét 213",
        notes: [
          "Lưu ý 1: Hoàn thành trước thời gian Chi bộ họp tổng kết.",
          "Lưu ý 2: Lưu bản PDF để đối chiếu khi cần.",
        ],
        sampleFile: "#",
        formLink: "#",
      },
      {
        name: "Phiếu cập nhật hồ sơ Đảng",
        notes: [
          "Lưu ý 1: Không để trống mục nghề nghiệp hiện tại.",
          "Lưu ý 2: Kiểm tra số quyết định nếu có cập nhật mới.",
        ],
        sampleFile: "#",
        formLink: "#",
      },
      {
        name: "Phiếu Bổ sung hồ sơ Đảng",
        notes: [
          "Lưu ý 1: Bổ sung đầy đủ thông tin thay đổi trong năm.",
          "Lưu ý 2: Kèm minh chứng nếu có thay đổi quan trọng.",
        ],
        sampleFile: "#",
        formLink: "#",
      },
      {
        name: "Bảng kiểm điểm cá nhân",
        notes: [
          "Lưu ý 1: Viết rõ mục tiêu phấn đấu năm sau.",
          "Lưu ý 2: Trình bày ngắn gọn nhưng đầy đủ nội dung.",
        ],
        sampleFile: "#",
        formLink: "#",
      },
    ],
  },
];

function FormsProcedures() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleGroup = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="p-4 space-y-6">

      {/* Khung Lưu ý quan trọng */}
      <div className="bg-yellow-100 border-l-4 border-yellow-600 text-yellow-800 p-4 rounded flex items-start gap-2">
        <Info size={20} className="mt-1"/>
        <p className="text-sm font-medium">
          <strong>Lưu ý quan trọng:</strong> Đảng viên phải hoàn thành{" "}
          <strong>Phiếu cập nhật thông tin hồ sơ Đảng</strong>{" "}
          trước khi sử dụng các biểu mẫu khác trong quy trình.
        </p>
      </div>

      {/* Khung Thông tin bổ sung */}
      <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded">
        <p className="text-sm">
          Nếu có sai sót/thắc mắc về nội dung biểu mẫu:
        </p>
        <ul className="ml-6 list-disc text-sm">
          <li>Đối với Biểu mẫu trực tuyến cho quy trình chuyển Đảng chính thức, liên hệ Đồng chí Đảng viên hướng dẫn được phân công.</li>
            <li className="list-none ml-0 mt-1"><b>Nếu chưa có, vui lòng liên hệ Chi ủy</b></li>
    
          <li>Đối với Biểu mẫu trực tuyến cho nhận xét cuối năm, liên hệ Đồng chí Danh Nguyễn Thành Thắng.</li>
        </ul>
        <p className="text-sm">
          Nếu có sai sót về kỹ thuật, xin liên hệ Đồng chí Phạm Thái Bảo.
        </p>
      </div>

      {/* Accordion biểu mẫu */}
      {formGroups.map((group, idx) => (
        <div key={idx} className="border rounded-xl p-4 bg-white shadow">
          <button
            onClick={() => toggleGroup(idx)}
            className="w-full text-left text-xl font-bold flex justify-between items-center"
          >
            {group.category}
            <span className="text-2xl font-bold">{openIndex === idx ? "−" : "+"}</span>
          </button>

          {openIndex === idx && (
            <div className="mt-4 space-y-4">
              {group.forms.map((form, fidx) => (
                <div key={fidx} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center gap-2 font-semibold text-gray-800">
                    <FileText size={18} />
                    {form.name}
                  </div>

                  <ul className="ml-6 mt-2 list-disc text-sm text-gray-700">
                    {form.notes.map((note, nidx) => (
                      <li key={nidx}>{note}</li>
                    ))}
                  </ul>

                  <div className="mt-3 flex gap-4">
                    <a href={form.sampleFile} className="text-blue-700 underline text-sm">
                      File kết quả mẫu
                    </a>
                    <a href={form.formLink} className="text-green-700 underline text-sm">
                      Link điền Form
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FormsProcedures;

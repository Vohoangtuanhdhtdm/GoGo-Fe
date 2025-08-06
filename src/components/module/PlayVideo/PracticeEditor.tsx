import { useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

interface PracticeEditorProps {
  initialCode: string;
  language: "javascript" | "html"; // Mở rộng nếu cần
}

export const PracticeEditor = ({ initialCode }: PracticeEditorProps) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]); // Lưu kết quả từ console.log

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput([]);
  };

  const handleRun = () => {
    setOutput([]); // Xóa kết quả cũ
    const logs: string[] = [];
    const originalConsoleLog = console.log;

    // Tạm thời ghi đè console.log để bắt output
    console.log = (...args) => {
      logs.push(args.map((arg) => JSON.stringify(arg)).join(" "));
    };

    try {
      // CẢNH BÁO BẢO MẬT: eval() rất nguy hiểm trong môi trường production thật.
      // Nó có thể thực thi mã độc. Chỉ dùng để demo.
      // Trong dự án thực tế, hãy dùng một sandbox (iframe, web worker).
      eval(code);
    } catch (error: any) {
      logs.push(`Lỗi: ${error.message}`);
    } finally {
      // Khôi phục lại console.log
      console.log = originalConsoleLog;
      setOutput(logs);
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between p-2 border-b bg-muted/50">
        <p className="text-sm font-semibold ml-2">Môi trường thực hành</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" /> Reset
          </Button>
          <Button variant="secondary" size="sm" onClick={handleRun}>
            <Play className="h-4 w-4 mr-2" /> Chạy
          </Button>
        </div>
      </div>
      <CardContent className="p-0">
        <CodeMirror
          value={code}
          height="400px"
          extensions={[javascript({ jsx: true })]} // Hỗ trợ cả JSX
          onChange={handleCodeChange}
          theme="dark" // Có thể chọn 'light' hoặc các theme khác
        />
      </CardContent>

      {output.length > 0 && (
        <div className="border-t p-4 bg-background">
          <h4 className="font-semibold text-sm mb-2">Kết quả:</h4>
          <pre className="bg-gray-900 text-white rounded-md p-3 text-xs overflow-x-auto">
            {output.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </pre>
        </div>
      )}
    </Card>
  );
};

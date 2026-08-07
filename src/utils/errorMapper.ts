import errorDataset from "@/data/python-errors.json";

export interface ErrorInfo {
  title: string;

  description: string;

  solution: string;
}

export function mapPythonError(stderr: string): ErrorInfo {
  const error = errorDataset.find((item) => {
    const regex = new RegExp(item.pattern, "i");

    return regex.test(stderr);
  });

  if (!error) {
    return {
      title: "Error Python",
      description: stderr,
      solution: "Periksa kembali kode program.",
    };
  }

  return {
    title: error.arti,
    description: `${error.penyebab}\n\n${error.solusi}`,
    solution: error.solusi,
  };
}

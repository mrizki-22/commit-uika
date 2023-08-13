"use client";
import React, { useState, useEffect } from "react";
import Editor from "ckeditor5/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios, { formToJSON } from "axios";
import "@/app/ckeditor.css";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import slugify from "slugify";
import Script from "next/script";
import { useTheme } from "@/app/context/ThemeProvider";
import { BiUpload } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
//@ts-ignore
import { convert } from "html-to-text";

type Artikel = {
  id: number;
  judul: string;
  slug: string;
  penulis: string;
  konten: string;
  teks_pratinjau: string;
  cover_img: string;
  cover_img_url: string;
  is_published: boolean;
  published_at: String;
  created_at: String;
  updated_at: String;
};

async function getData(slug: string): Promise<Artikel> {
  try {
    const res = await axios.get(`/api/blog/${slug}`);
    return res.data;
  } catch (err) {
    throw err;
  }
}

function FormEditor(props: { slug: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Artikel>({} as Artikel); //data.konten
  const [content, setContent] = useState("");
  const { theme } = useTheme();

  //cloudinary script load
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // const createMarkup = () => {
  //   return { __html: content };
  // };
  if (loading) {
    getData(props.slug)
      .then((data) => {
        if (data.is_published) {
          router.push("/admin-blog");
        } else {
          setData(data);
          setContent(data.konten);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Data gagal diambil");
        router.push("/admin-blog");
      });
  }

  async function handleSave() {
    //set teks pratinjau
    const options = {
      whitespaceCharacters: "\n",
      limits: {
        maxInputLength: 150,
      },
    };
    var text = convert(content, options);
    data.teks_pratinjau = text;

    //set slug
    data.slug = slugify(data.judul, {
      lower: true,
    });
    //set konten
    data.konten = content;
    console.log(data);
    try {
      await axios.post(`/api/blog/${props.slug}`, data, {
        headers: {
          "commit-api-key": process.env.NEXT_PUBLIC_COMMIT_API_KEY,
        },
      });
      toast.success("Berhasil menyimpan");
      router.push(`/admin-blog/${data.slug}`);
    } catch (err) {
      console.log(err);
      toast.error("Gagal menyimpan");
    }
  }

  useEffect(() => {}, [content]);

  useEffect(() => {
    if (scriptLoaded) {
      const myWidget = (window as any).cloudinary.createUploadWidget(
        {
          cloudName: "da6c2irvo",
          uploadPreset: "commit",
        },
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            // console.log("Done! Here is the image info: ", result.info);
            setData({
              ...data,
              cover_img: result.info.original_filename,
              cover_img_url: result.info.secure_url,
            });
            handleSave();
          }
        }
      );
      //@ts-ignore
      document.getElementById("upload_widget").addEventListener("click", () => {
        myWidget.open();
      });
    }
  }, [scriptLoaded]);

  return loading ? (
    <div className="flex w-full h-[60vh] justify-center items-center">
      <span className="loading loading-dots loading-lg"></span>
    </div>
  ) : (
    <>
      <div className="flex flex-col space-y-2 mb-4">
        <div>
          <Label htmlFor="title">Judul</Label>
          <Input
            id="title"
            type="text"
            placeholder="Judul"
            value={data.judul}
            onChange={(e) => {
              setData({
                ...data,
                judul: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex w-full space-x-2 ">
          <div className="w-full">
            <Label htmlFor="penulis">Penulis</Label>
            <Input
              id="penulis"
              type="text"
              placeholder="Penulis"
              value={data.penulis}
              onChange={(e) => {
                setData({
                  ...data,
                  penulis: e.target.value,
                });
              }}
            />
          </div>
          <div className="w-full flex flex-col justify-center  ">
            <div>
              <Label htmlFor="picture">Gambar Cover</Label>
            </div>
            <div className="w-full">
              {data.cover_img_url && data.cover_img ? (
                <div className=" flex justify-between items-center space-x-2">
                  <Input value={data.cover_img} readOnly />
                  <div className="tooltip tooltip-top" data-tip="Lihat Gambar">
                    <Button variant="outline">
                      <a href={data.cover_img_url} target="_blank">
                        <BsEye className="inline-block w-4 h-4 stroke-current" />
                      </a>
                    </Button>
                  </div>
                  <div className="tooltip tooltip-top" data-tip="Upload">
                    <Button id="upload_widget" variant="outline">
                      <BiUpload className="inline-block w-4 h-4 stroke-current" />
                    </Button>
                  </div>
                </div>
              ) : (
                <Button variant="outline" id="upload_widget" className="w-full">
                  <div className="flex">
                    <BiUpload className="inline-block w-4 h-4 mr-2 stroke-current" />
                    <p className="text-left">Upload</p>
                  </div>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={theme === "light" ? "" : "text-black"}>
        <CKEditor
          editor={Editor}
          config={{
            mediaEmbed: {
              previewsInData: true,
            },
          }}
          data={content}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
        />
      </div>

      <div className="mt-3 flex justify-end">
        <Button variant={"outline"} onClick={handleSave}>
          Simpan
        </Button>
      </div>
      <Script
        src="https://upload-widget.cloudinary.com/global/all.js"
        strategy="afterInteractive"
        onLoad={() => {
          setScriptLoaded(true);
        }}
      />

      {/* {scriptLoaded && <Script src="/widget.js" strategy="afterInteractive" />} */}

      {/* <div className="w-full bg-red-100">
        <h1>Content</h1>
        <div dangerouslySetInnerHTML={createMarkup()} className="ck-content"></div>
      </div> */}
    </>
  );
}

export default FormEditor;

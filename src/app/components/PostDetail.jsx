import React from "react";

import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const PostDetail = ({ post }) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      case "link": {
        const href = obj.href || obj.url;
        const content = Array.isArray(modifiedText)
          ? modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))
          : modifiedText;
        return (
          <a
            key={index}
            href={href}
            className="text-pink-600 underline hover:text-pink-700"
            target={obj.openInNewTab ? "_blank" : undefined}
            rel={obj.openInNewTab ? "noopener noreferrer" : undefined}
          >
            {content}
          </a>
        );
      }
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "image":
        return (
          <Image
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };

  return (
    <>
    <div className="w-full">
        <div className="relative overflow-hidden shadow-md mb-6">
          <img
            src={post.featuredImage.url}
            alt="featuredImage"
            className="object-top h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg"
          />
        </div>
        <div className="px-4 lg:px-0">
          <div className="flex items-center mb-8 w-full">
            
            <div className="font-medium text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline mr-2 text-pink-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="align-middle text-gray-500">
                {moment(post.createdAt).format("MMM DD, YYYY")}
              </span>
            </div>
          </div>
          <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
          {post.content.raw.children.map((typeObj, index) => {
            const children = typeObj.children.map((item, itemindex) => {
              if (item.type === "link") {
                const linkChildren = (item.children || []).map((child) => child.text);
                return getContentFragment(itemindex, linkChildren, item, "link");
              }
              return getContentFragment(itemindex, item.text, item);
            });

            return getContentFragment(index, children, typeObj, typeObj.type);
          })}
          <div className="mt-8">
            <Link href="/" className="inline-block bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;

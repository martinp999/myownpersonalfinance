import React from "react";

export default function TagBadgeElement({
  categoryId,
  name,
  colourPrimary,
  colourSecondary,
}) {
  return (
    <span
      data-category-id={categoryId}
      class="category-pill"
      style={{ color: colourPrimary, backgroundColor: colourSecondary }}
    >
      {name}
    </span>
  );
}

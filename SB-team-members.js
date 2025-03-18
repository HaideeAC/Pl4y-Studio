/**
 * Spirit&Bone - Team Members Module
 * Handles team member hover effects and interactions
 */

// Initialize team section
function initTeamSection() {
  // Get references to all team members
  const teamMembers = document.querySelectorAll(".team-member");

  // If no team members are found, exit early
  if (!teamMembers.length) {
    return;
  }

  // Set up hover interactions for each team member
  teamMembers.forEach((member) => {
    const memberImage = member.querySelector(".member-image");
    const memberInfo = member.querySelector(".member-info");

    if (!memberImage || !memberInfo) return;

    // Initialize animation state
    memberImage.style.transition = "all 0.5s cubic-bezier(0, 0, 0.2, 1)";
    memberInfo.style.visibility = "hidden";
    memberInfo.style.opacity = "0";

    // Add event listeners for hover effects
    member.addEventListener("mouseenter", () => {
      // Pause the floating animation
      const imageContainer = member.querySelector(".member-image-container");
      if (imageContainer) {
        imageContainer.style.animationPlayState = "paused";
      }

      // Apply hover effects
      memberImage.style.filter = "blur(5px) brightness(0.5)";
      memberImage.style.transform = "scale(1.12)";
      memberImage.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.25)";

      // Show member info
      memberInfo.style.visibility = "visible";
      memberInfo.style.opacity = "1";
      memberInfo.style.transform = "translate(-50%, -50%) scale(1.05)";
    });

    member.addEventListener("mouseleave", () => {
      // Resume the floating animation
      const imageContainer = member.querySelector(".member-image-container");
      if (imageContainer) {
        imageContainer.style.animationPlayState = "running";
      }

      // Remove hover effects
      memberImage.style.filter = "";
      memberImage.style.transform = "";
      memberImage.style.boxShadow = "";

      // Hide member info
      memberInfo.style.visibility = "hidden";
      memberInfo.style.opacity = "0";
      memberInfo.style.transform = "translateX(-50%)";
    });
  });

  // Make sure team layout is appropriate for screen size
  adjustTeamLayout();
  window.addEventListener("resize", adjustTeamLayout);
}

// Adjust team layout based on screen size
function adjustTeamLayout() {
  const teamContainer = document.querySelector(".team-container");
  if (!teamContainer) return;

  if (window.innerWidth <= 768) {
    // Mobile layout
    const teamMembers = document.querySelectorAll(".team-member");
    teamMembers.forEach((member, index) => {
      const row = Math.floor(index / 2);
      const col = index % 2;

      member.style.top = `${5 + row * 20}%`;
      member.style.left = col === 0 ? "10%" : "50%";
    });
  } else {
    // Reset to original desktop positions
    resetTeamPositions();
  }
}

// Reset team member positions to original layout
function resetTeamPositions() {
  const positions = [
    { id: "member1", top: "15%", left: "23%" },
    { id: "member2", top: "10%", left: "45%" },
    { id: "member3", top: "15%", left: "67%" },
    { id: "member4", top: "40%", left: "5%" },
    { id: "member5", top: "40%", left: "35%" },
    { id: "member6", top: "40%", left: "55%" },
    { id: "member7", top: "40%", left: "83%" },
    { id: "member8", top: "65%", left: "20%" },
    { id: "member9", top: "65%", left: "70%" },
  ];

  positions.forEach((pos) => {
    const member = document.getElementById(pos.id);
    if (member) {
      member.style.top = pos.top;
      member.style.left = pos.left;
    }
  });
}

// Export initialization function
export { initTeamSection };

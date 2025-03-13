import { ApiResponseHeader } from "@/utils/headers";
import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "@/app/_actions/auth";
import { userAuthRequest } from "@/utils/userApiRequest";
// import userSampleRequest from "@/utils/userSampleRequest";

export const dynamic = "force-dynamic";

// GET PROJECT
export async function POST(
  req: NextRequest,
  { params }: { params: { projectId: string } },
) {
  try {
    const token = await getCookie();
    const requestBody = await req.json();
    const response = await userAuthRequest(
      `projects/${params.projectId}/objects`,
      "POST",
      token,
      requestBody,
    );
    if (!response.ok) {
      // TODO : RestfulAPI - difference in status message
      const res = await response.text();
      return NextResponse.json(
        { error: res ? res : "ERROR FROM POSTING OBJECT" },
        {
          status: 200,
          headers: ApiResponseHeader,
        },
      );
    }

    const responseData = await response.json();
    //console.debug("response data from creating projects", responseData);
    return NextResponse.json(responseData, {
      status: 200,
      headers: ApiResponseHeader,
    });
  } catch (err) {
    console.debug(err);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { projectId: string } },
) {
  try {
    const token = await getCookie();
    const requestBody = await req.json();
    console.log(requestBody);
    const response = await userAuthRequest(
      `projects/${params.projectId}/objects/${requestBody.objectId}`,
      "DELETE",
      token,
    );
    if (!response.ok) {
      // TODO : RestfulAPI - difference in status message
      const res = await response.text();
      console.debug("ERROR RESPONSE FROM BACK :", res);
      return NextResponse.json(
        { error: res },
        {
          status: 200,
          headers: ApiResponseHeader,
        },
      );
    }
    const responseData = await response.json();
    return NextResponse.json(responseData, {
      status: 200,
      headers: ApiResponseHeader,
    });
  } catch (err) {
    console.debug(err);
  }
}

import { NextRequest, NextResponse } from "next/server";
import { generateLuckyNumbers, LotteryGame, PersonalInfo } from "@/lib/generation/lucky-numbers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { gameType, personalInfo } = body as {
      gameType: LotteryGame;
      personalInfo: PersonalInfo;
    };

    // Validate game type
    const validGameTypes = ["lotto645", "pension720", "spitto", "powerball"];
    if (!validGameTypes.includes(gameType)) {
      return NextResponse.json(
        { error: "Invalid game type" },
        { status: 400 }
      );
    }

    // Generate lucky numbers
    const result = generateLuckyNumbers(gameType, personalInfo);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate numbers" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "EIKO.KR Lucky Number Generation API",
    version: "1.0.0",
    endpoints: {
      POST: {
        description: "Generate lucky numbers",
        body: {
          gameType: "lotto645 | pension720 | spitto | powerball",
          personalInfo: {
            name: "string (optional)",
            birthYear: "number (optional)",
            birthMonth: "number (optional)",
            birthDay: "number (optional)",
            mood: "string (optional)",
            dreamSymbol: "string (optional)",
            importantDates: "string[] (optional)",
          },
        },
      },
    },
  });
}
